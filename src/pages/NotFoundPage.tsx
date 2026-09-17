import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-sand-50/80 text-riverbed-900 px-4 text-center select-none pt-24">
      <div className="clay-card p-8 sm:p-12 max-w-md border-2 border-white shadow-clay-lg space-y-6">
        <div className="size-16 rounded-full bg-water-50 text-water-600 flex items-center justify-center mx-auto shadow-clay-sm">
          <Compass className="size-8" />
        </div>

        <div className="space-y-2">
          <span className="clay-pill px-3 py-1 text-xs font-bold text-water-700 bg-water-50">
            Error 404
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-riverbed-900 pt-2">
            Path Not Found
          </h1>
          <p className="text-xs sm:text-sm text-riverbed-600 font-medium leading-relaxed">
            The page you are looking for may have wandered off into the misty bamboo groves. Return home to continue exploring.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="clay-btn-water text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-clay-btn-water"
          >
            <ArrowLeft className="size-4" />
            <span>Return to Sanctuary</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
