import { Carousel } from '../components/Carousel';
import { LoginForm } from '../components/LoginForm';
export function LoginPage() {
  return (
    <div className='min-h-screen w-full bg-nature-main p-4 md:p-8 flex flex-col'>
      {/* Header */}
      <header className='w-full max-w-7xl mx-auto flex justify-between items-center mb-8 px-2'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl md:text-3xl font-black tracking-tighter text-nature-text-primary'>
            AICOM<span className='text-white drop-shadow-md'>POS</span>
          </h1>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className='flex-grow w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-stretch'>
        {/* Left Column: Carousel */}
        <div className='w-full h-full min-h-[400px] lg:min-h-[600px]'>
          <Carousel />
        </div>

        {/* Right Column: Login Form */}
        <div className='w-full h-full min-h-[600px]'>
          <LoginForm />
        </div>
      </main>

      {/* Footer / Grid Overlay Effect */}
      <div
        className='fixed inset-0 pointer-events-none z-[-1] opacity-20'
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
