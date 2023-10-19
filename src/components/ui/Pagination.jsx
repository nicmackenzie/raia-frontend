import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGE_SIZE } from '../../lib/utils';
import Button from './Button';

export default function Pagination({ count, style = 'default' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next.toString());
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev.toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;
  if (style === 'default') {
    return (
      <div className="w-full flex items-center justify-between">
        <p className="text-sm ml-2">
          Showing{' '}
          <span className="font-semibold">
            {(currentPage - 1) * PAGE_SIZE + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold">
            {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
          </span>{' '}
          of <span className="font-semibold">{count}</span> results
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="pl-1">Previous</span>
          </Button>
          <Button
            type="button"
            onClick={nextPage}
            disabled={currentPage === pageCount}
            className="flex items-center gap-1"
            variant="outline"
            size="sm"
          >
            <span className="pr-1">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (style === 'modern') {
    return (
      <div className="flex justify-center items-center gap-6">
        <button
          type="button"
          className="bg-transparent text-primary w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-primary/10 disabled:pointer-events-none disabled:text-gray-300 disabled:dark:text-gray-500"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="text-xs ml-2">
          <span className="font-semibold">
            {(currentPage - 1) * PAGE_SIZE + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold">
            {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
          </span>{' '}
          of <span className="font-semibold">{count}</span> results
        </p>
        <button
          type="button"
          className="bg-transparent text-primary w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-primary/10 disabled:pointer-events-none disabled:text-gray-300 disabled:dark:text-gray-500"
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }
}
