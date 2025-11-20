import Filters from './filters';

function PhotographersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Find Photographers</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Find the perfect photographer for your needs.
      </p>
      <Filters />
      <p className="text-lg font-bold">4 photographers match your needs</p>
      <div className="min-h-[300px]"></div>
    </div>
  );
}

export default PhotographersPage;
