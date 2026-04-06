'use client';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import AppointmentForm from '../components/AppointmentForm'; // Certifique-se de ter criado este arquivo antes!

type User = {
  id: string;
  name: string;
  specialty: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  // Busca os profissionais para exibir na lista lateral/inferior
  useEffect(() => {
    let mounted = true;
    setUsersLoading(true);
    setUsersError(null);

    api
      .get<User[]>('/users')
      .then((res) => {
        if (!mounted) return;
        setUsers(res.data);
      })
      .catch((err) => {
        if (!mounted) return;
        const message =
          err?.response?.data?.message ??
          err?.message ??
          'Não foi possível carregar a equipe. Verifique se o backend está rodando.';
        setUsersError(String(message));
      })
      .finally(() => {
        if (!mounted) return;
        setUsersLoading(false);
      });

    return () => {
      mounted = false;
    };
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
            {usersLoading ? (
              <ul className="space-y-3" aria-busy="true" aria-label="Carregando equipe">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <li key={idx} className="p-3 rounded-lg border border-gray-100">
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-2 h-3 w-28 bg-gray-200 rounded animate-pulse" />
                  </li>
                ))}
              </ul>
            ) : usersError ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-semibold">Erro ao carregar equipe</p>
                <p className="mt-1">{usersError}</p>
              </div>
            ) : users.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-semibold">Nenhum profissional cadastrado</p>
                <p className="mt-1">
                  Cadastre um profissional via <span className="font-mono">POST /users</span> para exibir a equipe aqui.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="flex flex-col p-3 hover:bg-blue-50 rounded-lg transition focus-within:ring-2 focus-within:ring-blue-500"
                  >
                    <span className="font-semibold text-gray-900">{user.name}</span>
                    <span className="text-sm text-blue-700 font-medium italic">{user.specialty}</span>
                  </li>
                ))}
              </ul>
            )}
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