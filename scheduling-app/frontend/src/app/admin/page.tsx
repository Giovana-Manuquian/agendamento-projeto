'use client';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

type Appointment = {
  id: string;
  clientName: string;
  date: string;
  status: string;
  service?: { name: string };
};

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar os agendamentos
  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get<Appointment[]>('/appointments');
      setAppointments(res.data);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        err?.message ??
        'Não foi possível carregar os agendamentos. Verifique se o backend está rodando.';
      setError(String(message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Função para mudar o status (Confirmar/Cancelar)
  const handleStatus = async (id: string, status: string) => {
    await api.patch(`/appointments/${id}/status`, { status });
    loadAppointments(); // Recarrega a lista após atualizar
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Painel de Controle - Agendamentos</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-600" aria-busy="true">
              Carregando agendamentos...
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-semibold">Erro ao carregar</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <p className="p-10 text-center text-gray-500">Nenhum agendamento encontrado.</p>
          ) : (
            <>
              {/* Desktop/tablet */}
              <div className="hidden md:block">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-800 text-white text-sm uppercase">
                    <tr>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Serviço/Loja</th>
                      <th className="p-4">Data/Hora</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointments.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 text-gray-700">
                        <td className="p-4 font-medium">{app.clientName}</td>
                        <td className="p-4">{app.service?.name ?? '-'}</td>
                        <td className="p-4 italic">{new Date(app.date).toLocaleString('pt-BR')}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              app.status === 'CONFIRMED'
                                ? 'bg-green-100 text-green-700'
                                : app.status === 'CANCELED'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2 justify-center">
                          <button
                            onClick={() => handleStatus(app.id, 'CONFIRMED')}
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => handleStatus(app.id, 'CANCELED')}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                          >
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {appointments.map((app) => (
                  <div key={app.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">{app.clientName}</p>
                        <p className="text-sm text-gray-700">{app.service?.name ?? '-'}</p>
                        <p className="mt-1 text-sm text-gray-600">{new Date(app.date).toLocaleString('pt-BR')}</p>
                      </div>
                      <span
                        className={`shrink-0 px-2 py-1 rounded text-xs font-bold ${
                          app.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-700'
                            : app.status === 'CANCELED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleStatus(app.id, 'CONFIRMED')}
                        className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => handleStatus(app.id, 'CANCELED')}
                        className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}