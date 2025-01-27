interface CategoryPageProps {
    params: { category: string };
  }
  
  export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = params;
    // fetch products by category
    return (
      <div>
        <h1>Category: {category}</h1>
        {/* map products of this category */}
      </div>
    )
  }
  