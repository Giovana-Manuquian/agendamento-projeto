'use client';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import AppointmentForm from '../components/AppointmentForm'; // Certifique-se de ter criado este arquivo antes!

export default function Home() {
  const [users, setUsers] = useState([]);

  // Busca os profissionais para exibir na lista lateral/inferior
  useEffect(() => {
    api.get('/users').then((res: any) => setUsers(res.data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* COLUNA DA ESQUERDA: Boas-vindas e Lista de Profissionais */}
        <section className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Scheduling App
            </h1>
            <p className="text-lg text-gray-600">
              Sistema de gestão para as unidades <strong>Onnix, Aya e LLF</strong>.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Nossa Equipe
            </h2>
            <ul className="space-y-3">
              {users.map((user: any) => (
                <li key={user.id} className="flex flex-col p-3 hover:bg-blue-50 rounded-lg transition">
                  <span className="font-semibold text-gray-900">{user.name}</span>
                  <span className="text-sm text-blue-600 font-medium italic">
                    {user.specialty}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* COLUNA DA DIREITA: O Formulário que você vai usar para agendar */}
        <section className="flex justify-center">
          <AppointmentForm />
        </section>

      </div>
    </main>
  );
}