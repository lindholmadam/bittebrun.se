"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Fel email eller lösenord");
    } else {
      window.location.href = "/gallery";
    }
  };

  return (
    <div className="h-[80vh] flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white px-4 pt-30 rounded w-96">
        <h2 className="text-2xl mb-4 text-center">Logga in</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>} 

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded cursor-pointer">
          Logga in
        </button>
      </form>
    </div>
  );
}