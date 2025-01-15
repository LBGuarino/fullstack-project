export interface LandingPagePCProps {
    name: string;
    price: number;
    image: string;
    description: string;
  }
  
  export const LandingPagePC: React.FC<LandingPagePCProps> = ({
    name,
    price,
    image,
    description,
  }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
        <div className="h-full w-full">
          <img
            src={image}
            alt={name}
            className="h-1/2 w-1/2 object-cover"
          />
        </div>
  
        {/* Contenido de la tarjeta */}
        <div className="p-4 flex flex-col gap-2">
          {/* Nombre del producto */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
  
          {/* Precio */}
          <p className="text-xl font-bold text-indigo-600">${price.toFixed(2)}</p>
  
          {/* Descripción */}
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
  
          {/* Botón de acción */}
          <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Añadir al carrito
          </button>
        </div>
      </div>
    );
  };
  
  export default LandingPagePC;
  