"use client";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  return (
    <div className="mt-12 flex justify-between w-full">
      <button className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200" disabled={!hasPrev}>
        Previous
      </button>
      <button className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200" disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};
export default Pagination;
// This component renders a simple pagination control with "Previous" and "Next" buttons.
// The buttons are styled with Tailwind CSS classes and are disabled when appropriate.
