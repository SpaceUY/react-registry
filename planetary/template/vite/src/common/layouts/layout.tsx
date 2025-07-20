// Layout for non-auth routes -> Landing, sign up, etc
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen w-full">
      <main className="relative z-10 flex flex-col px-4 justify-center md:justify-start items-center text-center min-h-[100dvh-3.5rem] h-[100dvh] overflow-y-auto md:max-w-7xl md:mx-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
