export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="text-5xl font-black">
        Settings
      </h1>

      <p className="mt-4 text-zinc-400">
        Store settings will appear here.
      </p>

      <div className="mt-10 rounded-2xl bg-zinc-900 p-8">
        <h2 className="text-2xl font-bold">
          Coming Soon
        </h2>

        <p className="mt-4 text-zinc-400">
          Here you'll be able to update your store name,
          WhatsApp number, business email, address,
          logo and other settings.
        </p>
      </div>

    </main>
  );
}