function PagginationNew({ limit, setPage, total, page }) {
  return (
    limit < total && (
      <div>
        <div className=" flex items-end gap-1 ">
          <div className="mr-1  text-sm">
            <span>
              {page * limit > total
                ? `${total}`
                : `${page * limit - (limit - 1)} - ${page * limit}`}
            </span>
            <span className="mx-0.5"> of </span>
            {total}
          </div>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`material-symbols-outlined flex items-center justify-center 
            rounded-sm px-1  text-2xl shadow hover:bg-bg--primary-100
            opacity-${page === 1 ? '50' : '100'}`}
          >
            chevron_left
          </button>
          <button
            disabled={page * limit > total}
            onClick={() => setPage(page + 1)}
            className={`material-symbols-outlined flex items-center justify-center 
            rounded-sm px-1  text-2xl shadow hover:bg-bg--primary-100 
            opacity-${page * limit > total ? '50' : '100'}`}
          >
            chevron_right
          </button>
        </div>
      </div>
    )
  );
}

export default PagginationNew;
