import Link from 'next/link';
import Image from 'next/image';
import { ICategory } from '@/interfaces/ICategory';
import { IProduct } from '@/interfaces/IProduct';
import { ProductWCategory } from '../DropdownMenu';

interface MobileDropdownProps {
  categories: ICategory[];
  popularProducts: ProductWCategory[];
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({
  categories,
  popularProducts
}) => {
  return (
    <div
      className="z-50 bg-white/70 backdrop-blur-md shadow-lg rounded-md p-4 flex flex-col gap-4"
    >
      {/* Sección de Categorías */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 uppercase mb-2">
          Categories
        </h4>
        <ul className="flex flex-col gap-2">
          {categories.map(({ id, name }) => (
            <li key={id}>
              <Link
                href={`/categories/${id}`}
                className="
                  block
                  text-gray-600 
                  hover:text-black 
                  hover:bg-gray-100 
                  rounded-md 
                  px-2 
                  py-1
                  transition-colors
                "
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de Productos Favoritos */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 uppercase mb-2">
          Favourite Products
        </h4>
        <ul className="flex flex-col gap-2">
          {popularProducts.map(({ id, name, image }) => (
            <li key={id}>
              <Link
                href={`/products/${id}`}
                className="
                  flex 
                  items-center 
                  gap-3
                  text-gray-600
                  hover:text-black
                  hover:bg-gray-100
                  rounded-md
                  px-2
                  py-2
                  transition-colors
                "
              >
                <Image
                  src={image}
                  alt={name}
                  width={40}
                  height={40}
                  className="object-cover rounded-md border border-gray-200"
                />
                <span className="truncate text-sm">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileDropdown;
