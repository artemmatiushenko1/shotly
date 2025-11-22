import Filters from './filters';
import PhotographerCard from './photographer-card';

function PhotographersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Find Photographers</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Find the perfect photographer for your needs.
      </p>
      <Filters />
      <p className="text-lg font-bold mb-4 mt-12">
        4 photographers match your needs
      </p>
      <div className="min-h-[300px] grid grid-cols-2 gap-4">
        <PhotographerCard
          id="8tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6t"
          name="John Doe"
          image="/avatar-1.jpg"
          location="New York"
          rating={4.5}
          yearsOfExperience={10}
          startingPrice={100}
          currency="грн"
          categoryName="Wedding"
          portfolioImages={[
            '/auth-banner-2.jpg',
            '/auth-banner-3.jpg',
            '/auth-banner-4.jpg',
          ]}
        />
        <PhotographerCard
          id="8tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6t"
          name="Jane Doe"
          image="/avatar-2.jpg"
          location="Los Angeles"
          rating={4.5}
          yearsOfExperience={10}
          startingPrice={100}
          currency="грн"
          categoryName="Photography"
          portfolioImages={[
            '/auth-banner-2.jpg',
            '/auth-banner-3.jpg',
            '/auth-banner-4.jpg',
          ]}
        />
        <PhotographerCard
          id="8tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6t"
          name="John Doe"
          image="/avatar-3.jpg"
          location="New York"
          rating={4.5}
          yearsOfExperience={10}
          startingPrice={100}
          currency="грн"
          categoryName="Portrait"
          portfolioImages={[
            '/auth-banner-2.jpg',
            '/auth-banner-3.jpg',
            '/auth-banner-4.jpg',
          ]}
        />
      </div>
    </div>
  );
}

export default PhotographersPage;
