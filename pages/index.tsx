import localFont from "next/font/local";

export default function Home() {
  return (
    <div className='min-h-screen bg-background-secondary flex space-y-8 flex-col items-center justify-center'>
      <div className='rounded-lg text-center w-[90vw] bg-gray-100 p-6'>
        <h1 className='text-4xl font-bold text-text-primary-900'>
          Menu jest puste
        </h1>
        <p className='mt-4 text-text-tertiary-600'>
          W tym menu nie ma jeszcze żadnych linków.
        </p>
        <button className='mt-6 px-4 py-2 bg-button-primary-bg text-button-primary-fg hover:bg-violet-600'>
          Dodaj pozycję menu
        </button>
      </div>

      <div className=' border-border-primary border-2 rounded-lg flex flex-row text-center w-[90vw] bg-bg-primary'>
        <div className='w-[95%] flex flex-col text-left p-6 space-y-2'>
          <p className='text-text-secondary-700'>Nazwa</p>
          <input
            className='border-border-primary border-2 rounded-xl p-2'
            type='text'
            placeholder='np. Promocje'
          />
          <p className='text-text-secondary-700'>Link</p>
          <input
            className='border-border-primary border-2 rounded-xl p-2'
            type='text'
            placeholder='Wklej lub wyszukaj'
          />
          <div className='flex flex-row space-x-2 '>
            <button className='text-button-secondary-fg border-border-primary border rounded-lg p-2'>
              Anuluj
            </button>
            <button className='text-button-secondary-colorFg border-border-secondary border rounded-lg p-2'>
              Dodaj
            </button>
          </div>
        </div>
        <div className=''>
          <button className='rounded-full mt-6 px-4 py-2 bg-button-primary-bg text-button-primary-fg hover:bg-violet-600'>
            x
          </button>
        </div>
      </div>
    </div>
  );
}
