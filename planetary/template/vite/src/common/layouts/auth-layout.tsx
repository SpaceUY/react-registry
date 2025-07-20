type AuthLayoutProps = {
  children: React.ReactNode;
};

// Implement here any sidebar, auth validations, and other guards logic
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] w-full max-w-5xl mx-auto z-10">
      <main className="flex-1 w-full">
        <div className="container mx-auto md:gap-8 h-full p-4 sm:px-6 md:pt-8 pb-24 md:pb-4">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
