import { Outlet } from 'react-router-dom';
import Button from '../ui/components/Button';
import { useSelector } from 'react-redux';
import useExportToCsv from './useExportCsv';
import SelectItem from '../ui/components/SelectItem';

function ClassLayout() {
  const { root } = useSelector((store) => store.global);
  const { isLoading, mutate } = useExportToCsv();

  return (
    <div className="flex flex-col  ">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-end">
          <div className=" text-2xl text-text--secondery">Classes/</div>
          <span className=" text-base font-normal uppercase opacity-70">{root}</span>
        </div>

        <div className=" flex items-end gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //   mutate();
            }}
          >
            <SelectItem
              disabled={isLoading}
              buttonType="secondery"
              size="medium"
              btnTitle="EXPORT"
              icon="download"
              bg="bg-bg--primary-500"
              items={[['Export to CSV'], ['Export to PDF']]}
            />
          </form>
          <Button to="new" type="primary" icon="add">
            Add class
          </Button>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default ClassLayout;
