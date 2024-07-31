import SelectItem from './SelectItem';
import useExportToCsv from '../../class/useExportCsv';
import useExportToPdf from '../../class/useExportPdf';

export function Exports({ category, btnType, items, size }) {
  const { isLoading: isLoadingCsv, mutate: exportCsv } = useExportToCsv();
  const { isLoading: isLoadingPdf, mutate: exportPdf } = useExportToPdf();

  function onSelectHandler(selected) {
    if (selected === 'Export to CSV') {
      exportCsv({ category });
    }
    if (selected === 'Export to PDF') {
      exportPdf({ category });
    }
    if (selected === 'Payments Sheet') {
      exportPdf({ category, subCategory: 'payments_sheet' });
    }
  }
  return (
    <div>
      <SelectItem
        disabled={isLoadingCsv || isLoadingPdf}
        onClick={onSelectHandler}
        buttonType={btnType || 'secondery'}
        size={size || 'medium'}
        icon="download"
        items={items || [['Export to CSV'], ['Export to PDF']]}
      />
    </div>
  );
}

export default Exports;
