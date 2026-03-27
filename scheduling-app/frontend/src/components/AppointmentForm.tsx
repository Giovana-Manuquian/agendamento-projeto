// frontend/src/components/AppointmentForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function AppointmentForm() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    date: '',
    serviceId: ''
  });
  const [message, setMessage] = useState('');

  // Busca os serviços (Onnix, Aya, LLF) para preencher o Select
  useEffect(() => {
    api.get('/services').then(res => setServices(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviamos para a rota POST /appointments que testamos no Postman
      await api.post('/appointments', formData);
      setMessage('✅ Agendamento realizado com sucesso!');
      setFormData({ clientName: '', clientEmail: '', date: '', serviceId: '' });
    } catch (error: any) {
      setMessage(`❌ Erro: ${error.response?.data?.message || 'Erro ao agendar'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">Novo Agendamento</h2>
      
      <input
        type="text"
        placeholder="Seu Nome"
        className="w-full p-2 border rounded text-black"
        value={formData.clientName}
        onChange={e => setFormData({...formData, clientName: e.target.value})}
        required
      />

      <input
        type="email"
        placeholder="Seu E-mail"
        className="w-full p-2 border rounded text-black"
        value={formData.clientEmail}
        onChange={e => setFormData({...formData, clientEmail: e.target.value})}
        required
      />

      <input
        type="datetime-local"
        className="w-full p-2 border rounded text-black"
        value={formData.date}
        onChange={e => setFormData({...formData, date: e.target.value})}
        required
      />

      <select 
        className="w-full p-2 border rounded text-black"
        value={formData.serviceId}
        onChange={e => setFormData({...formData, serviceId: e.target.value})}
        required
      >
        <option value="">Selecione o Serviço (Loja)</option>
        {services.map((s: any) => (
          <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>
        ))}
      </select>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
        Reservar Horário
      </button>

      {message && <p className="text-sm text-center mt-2 font-medium">{message}</p>}
    </form>
  );
}