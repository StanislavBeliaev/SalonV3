interface FilterSideScrollProps {
  elements: any[];
  handleCategoryClick: (categoryId: number) => void;
  activeCategoryId: number | null;
}
export default function FilterSideScroll({ elements, handleCategoryClick, activeCategoryId }: FilterSideScrollProps) {
 
  return (
    <div className="flex w-full overflow-x-auto">
      <div className="flex gap-2 min-w-max pb-4">
        {elements.map((element) => (
          <div 
            key={element.id}
            onClick={() => handleCategoryClick(element.id)} 
            className={`flex-shrink-0 px-4 py-2 hover:bg-primary hover:text-white text-black rounded-full whitespace-nowrap text-sm font-medium transition-colors cursor-pointer ${activeCategoryId === element.id ? "bg-primary text-white" : ""}`}
          >
            {element.name}
          </div>
        ))}
      </div>
    </div>
  );
}