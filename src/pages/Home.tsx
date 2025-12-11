import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar'
import type { FilterValues } from '@/features/filters/types/filters';
import SortTopBar from '@/features/filters/components/SortTopBar';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import type { Product } from '@/features/products/types/product';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import Breadcrumb from '@/components/common/Breadcrumb';
import { parseFiltersFromUrl } from '@/features/filters/utils/parseFiltersFromURL';
import { buildingQueryString } from '@/features/filters/utils/queryBuilder';
import FilterChips from '@/components/FilterSidebar/FilterChips';
import { getDefaultFilters } from '@/features/filters/utils/defaultFilters';
import { useProductCount } from '@/features/products/hooks/useProductCount';
import { useProducts } from '@/features/products/hooks/useProducts';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const appliedFilters = parseFiltersFromUrl(location.search);

  const [draftFilters, setDraftFilters] = useState<FilterValues>({
    ...appliedFilters,
    ForRent: appliedFilters.ForRent || "0",
  });

  const [period, setPeriod] = useState(appliedFilters.Period || "");
  const [sortOrder, setSortOrder] = useState(appliedFilters.SortOrder || "");
  
  const countQuery = useProductCount(appliedFilters, period, sortOrder);
  const productsQuery = useProducts(appliedFilters, period, sortOrder);

  const [activeTab, setActiveTab] = useState(appliedFilters.CategoryTab);

  const applyFiltersAndNavigate = (filtersToApply: FilterValues) => {
    const qs = buildingQueryString(filtersToApply, period, sortOrder);
    navigate(`/?${qs}`);
  };

  useEffect(() => {
    setDraftFilters({
      ...appliedFilters,
      ForRent: appliedFilters.ForRent || "0",
    });
  }, [location.search]);

  useEffect(() => {
    if (!period && !sortOrder) return;
    const qs = buildingQueryString(appliedFilters, period, sortOrder);
    navigate(`/?${qs}`);
  }, [period, sortOrder]);

  useEffect(() => {
    if (appliedFilters.CategoryTab !== activeTab) {
      setActiveTab(appliedFilters.CategoryTab);
    }
  }, [appliedFilters.CategoryTab]);

  return (
    <main className="app-content mt-[0px] md:mt-[16px] mb-[32px]">

    <div className="container xl:px-[20px] 2xl:px-[148px]">

      <div className="hidden md:block">
        <Breadcrumb forRent={appliedFilters.ForRent} />
      </div>

      <div className="flex justify-between">

        <div className="hidden md:block w-[250px] sticky self-start flex-shrink-0">
          <FilterSidebar
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            filters={draftFilters}
            setFilters={setDraftFilters}
            resultCounts={countQuery.data}
            onSearch={() => applyFiltersAndNavigate(draftFilters)}
            isFetchingCount={countQuery.isFetching}
          />
        </div>

        <div className="search-content flex flex-col gap-4">

        <div className="hidden md:block">
          <SortTopBar
            total={countQuery.data}
            isFetchingCount={countQuery.isFetching}
            period={period}
            sortOrder={sortOrder}
            onPeriodChange={setPeriod}
            onSortChange={setSortOrder}
          />
        </div>

        <FilterChips
          filters={appliedFilters}
          onUpdate={(newFilters) => applyFiltersAndNavigate(newFilters)}
        />

        <div className="flex flex-col gap-4">
          {productsQuery.isFetching && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {productsQuery.error && (
            <p className="text-red-500">Error loading products</p>
          )}

          {!productsQuery.isFetching && !productsQuery.error && productsQuery.data?.items?.length === 0 && (
            <EmptyState
              onClick={() => applyFiltersAndNavigate(getDefaultFilters())}
            />
          )}

          {!productsQuery.isFetching && !productsQuery.error && productsQuery.data?.items?.length > 0 && (
            <div className="flex flex-col md:gap-4">
              {productsQuery.data.items.map((product: Product) => (
                <ProductCard
                  key={product.car_id}
                  product={product}
                  currency={appliedFilters.Currency}
                />
              ))}
            </div>
          )}
        </div>

      </div>
      </div>

    </div>
  </main>
  );
} 

export default Home