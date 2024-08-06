import SelectItem from './SelectItem';
import useExportToCsv from '../../class/useExportCsv';
import useExportToPdf from '../../class/useExportPdf';

export function Exports({ selected: _selected, category, buttonSize, items, size, classId }) {
  const { isLoading: isLoadingCsv, mutate: exportCsv } = useExportToCsv();
  const { isLoading: isLoadingPdf, mutate: exportPdf } = useExportToPdf();

  function onSelectHandler(selected) {
    if (selected === 'Export to CSV') {
      exportCsv({ category, _selected, classId });
    }
    if (selected === 'Export to PDF') {
      exportPdf({ category, _selected, classId });
    }
    if (selected === 'Payments Sheet') {
      exportPdf({ category, subCategory: 'payments_sheet', _selected, classId });
    }
  }
  return (
    <div>
      <SelectItem
        disabled={isLoadingCsv || isLoadingPdf}
        onClick={onSelectHandler}
        buttonSize={buttonSize || 'sm'}
        size={size || 'medium'}
        icon="download"
        items={items || [['Export to CSV'], ['Export to PDF']]}
      />
    </div>
  );
}

export default Exports;
