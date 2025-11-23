import React from 'react';
import CollectionCard from './collection-card';

function SeePorfolio() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CollectionCard
          id="1"
          coverPhotoUrl="https://firebasestorage.googleapis.com/v0/b/personal-website-4afb5.appspot.com/o/artworks%2FIMG_4245-min.jpg?alt=media&token=28447e80-bebd-457e-8ae0-45fd09664b04"
          title="Весняні портрети"
          description="Description 1"
          photosCount={10}
          updatedAt={new Date()}
          category="Портрет"
        />
        <CollectionCard
          id="2"
          coverPhotoUrl="https://firebasestorage.googleapis.com/v0/b/personal-website-4afb5.appspot.com/o/artworks%2FIMG_9762-min.jpg?alt=media&token=008cf0c4-76f9-401f-9c13-9e9492015276"
          title="Туманна осінь"
          description="Description 2"
          photosCount={5}
          updatedAt={new Date()}
          category="Пейзаж"
        />
        <CollectionCard
          id="3"
          coverPhotoUrl="https://firebasestorage.googleapis.com/v0/b/personal-website-4afb5.appspot.com/o/artworks%2FIMG_1861-min.jpg?alt=media&token=4871b83e-a263-43b9-a510-4dc96d61f7b5"
          title="Crupto Bunny"
          description="Description 3"
          photosCount={12}
          updatedAt={new Date()}
          category="Арт"
        />
        <CollectionCard
          id="3"
          coverPhotoUrl="https://as1.ftcdn.net/v2/jpg/04/20/23/18/1000_F_420231804_3kXXM3lxDnVBtmBlVgbWeS69zOpdkdXd.jpg"
          title="Пасхальна випічка"
          description="Description 3"
          photosCount={30}
          updatedAt={new Date()}
          category="Їжа"
        />
        <CollectionCard
          id="3"
          coverPhotoUrl="https://as1.ftcdn.net/v2/jpg/15/57/02/58/1000_F_1557025851_wxUOncHEnilLU3Z9PhwfF3NjfN6eCBj9.jpg"
          title="Jack Russell Family - Весна 2025"
          description="Description 3"
          photosCount={25}
          updatedAt={new Date()}
          category="Тварини"
        />
      </div>
    </div>
  );
}

export default SeePorfolio;
