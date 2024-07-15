import SelectItem from './SelectItem';
import useExportToCsv from '../../class/useExportCsv';
import useExportToPdf from '../../class/useExportPdf';

export function Exports({ category }) {
  const { isLoading: isLoadingCsv, mutate: exportCsv } = useExportToCsv();
  const { isLoading: isLoadingPdf, mutate: exportPdf } = useExportToPdf();

  function onSelectHandler(e) {
    if (e.target.id === 'Export to CSV') {
      exportCsv({ category });
    }
    if (e.target.id === 'Export to PDF') {
      exportPdf({ category });
    }
  }
  return (
    <div>
      <SelectItem
        disabled={isLoadingCsv || isLoadingPdf}
        onClick={onSelectHandler}
        buttonType="secondery"
        size="medium"
        icon="download"
        items={[['Export to CSV'], ['Export to PDF']]}
      />
    </div>
  );
}

export default Exports;
