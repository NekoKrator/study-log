import MainTabs from './components/Tabs/MainTabs';

export default function App() {
  return (
    <div className='container mx-auto p-4 max-w-6xl '>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Study Progress Log</h1>
        <p className='text-muted-foreground'>
          Track your daily study progress and build consistency
        </p>
      </div>
      <MainTabs />
    </div>
  );
}
