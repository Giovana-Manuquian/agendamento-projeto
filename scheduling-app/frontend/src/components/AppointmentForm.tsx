// frontend/src/components/AppointmentForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
};

type AppointmentPayload = {
  clientName: string;
  clientEmail: string;
  date: string;
  serviceId: string;
};

export default function AppointmentForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AppointmentPayload>({
    clientName: '',
    clientEmail: '',
    date: '',
    serviceId: ''
  });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Busca os serviços (Onnix, Aya, LLF) para preencher o Select
  useEffect(() => {
    let mounted = true;
    setServicesLoading(true);
    setServicesError(null);

    api
      .get<Service[]>('/services')
      .then((res) => {
        if (!mounted) return;
        setServices(res.data);
      })
      .catch((err) => {
        if (!mounted) return;
        const message =
          err?.response?.data?.message ??
          err?.message ??
          'Não foi possível carregar os serviços. Verifique se o backend está rodando.';
        setServicesError(String(message));
      })
      .finally(() => {
        if (!mounted) return;
        setServicesLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setFeedback(null);
      // Enviamos para a rota POST /appointments que testamos no Postman
      await api.post('/appointments', formData);
      setFeedback({ type: 'success', message: 'Agendamento realizado com sucesso!' });
      setFormData({ clientName: '', clientEmail: '', date: '', serviceId: '' });
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao agendar. Tente novamente.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">Novo Agendamento</h2>
      
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-800" htmlFor="clientName">
          Nome
        </label>
        <input
          id="clientName"
          type="text"
          autoComplete="name"
          className="w-full p-2 border rounded text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          value={formData.clientName}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-800" htmlFor="clientEmail">
          E-mail
        </label>
        <input
          id="clientEmail"
          type="email"
          autoComplete="email"
          className="w-full p-2 border rounded text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          value={formData.clientEmail}
          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-800" htmlFor="date">
          Data e hora
        </label>
        <input
          id="date"
          type="datetime-local"
          className="w-full p-2 border rounded text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-800" htmlFor="serviceId">
          Serviço / Loja
        </label>
        <select
          id="serviceId"
          className="w-full p-2 border rounded text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:bg-gray-50"
          value={formData.serviceId}
          onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
          required
          disabled={servicesLoading || !!servicesError}
        >
          <option value="">
            {servicesLoading
              ? 'Carregando serviços...'
              : servicesError
                ? 'Erro ao carregar serviços'
                : 'Selecione o Serviço (Loja)'}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — R$ {Number(s.price).toFixed(2)} ({s.duration}min)
            </option>
          ))}
        </select>
        {servicesError && <p className="text-xs text-red-700">{servicesError}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting || servicesLoading || !!servicesError}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Reservando...' : 'Reservar Horário'}
      </button>

      {feedback && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            feedback.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
          role="status"
        >
          {feedback.message}
        </div>
      )}
    </form>
  );
}