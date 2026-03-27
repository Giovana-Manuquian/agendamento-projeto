'use client';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function AdminPage() {
  const [appointments, setAppointments] = useState([]);

  // Função para carregar os agendamentos
  const loadAppointments = async () => {
    const res = await api.get('/appointments');
    setAppointments(res.data);
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
              {appointments.map((app: any) => (
                <tr key={app.id} className="hover:bg-gray-50 text-gray-700">
                  <td className="p-4 font-medium">{app.clientName}</td>
                  <td className="p-4">{app.service?.name}</td>
                  <td className="p-4 italic">{new Date(app.date).toLocaleString('pt-BR')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      app.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                      app.status === 'CANCELED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
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
          {appointments.length === 0 && <p className="p-10 text-center text-gray-500">Nenhum agendamento encontrado.</p>}
        </div>
      </div>
    </main>
  );
}