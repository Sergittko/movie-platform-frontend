import Image from 'next/image';
import { FC } from 'react';

import RowContainer from '@/components/basic/layouts/RowContainer';
import { getTmdbImage } from '@/helpers/getTmdbImage';
import { IProductionCompanies } from '@/types/movies';

interface IProductionCompaniesListProps {
  productionCompanies: IProductionCompanies[];
}

const ProductionCompaniesList: FC<IProductionCompaniesListProps> = ({ productionCompanies }) => {
  return (
    <div>
      <p className="mt-4 mb-1 text-sm text-white/60">
        Production compan{productionCompanies.length === 1 ? 'y' : 'ies'}:
      </p>
      <RowContainer className="flex-wrap items-center gap-1">
        {productionCompanies.map((company, index) => (
          <RowContainer
            key={company.name + index}
            className="w-fit items-center justify-center gap-1"
          >
            {!!company.logo_path && (
              <Image
                src={getTmdbImage(company.logo_path)}
                alt={company.name + '_icon'}
                width={50}
                height={50}
                loading="lazy"
                className="h-6 max-h-6 max-w-6 min-w-6 rounded-full bg-white/80 object-contain p-0.5"
              />
            )}
            <p className="min-w-fit text-sm text-white/80">
              {company.name}
              {index !== productionCompanies.length - 1 && ', '}
            </p>
          </RowContainer>
        ))}
      </RowContainer>
    </div>
  );
};

export default ProductionCompaniesList;
