import { format } from 'date-fns';
import { forwardRef, useState, useImperativeHandle } from 'react';
import { DayPicker } from 'react-day-picker';
import { Controller, useFormContext } from 'react-hook-form';
import HookformRadio from './HookformRadio';
import { SCHEDULE_CATEGORY } from 'constants/pageConstacts';

const DdayHandler = forwardRef((props, ref) => {
    const [selected, setSelected] = useState();
    const { control, errors } = useFormContext();

    console.log('errors ::: ', errors);

    let footer;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }

    const setDate = (date, onChange) => {
        if (!date) return;
        const formattingDate = format(date, 'yyyy-MM-dd'); //
        setSelected(date); //
        onChange(formattingDate);
    };

    useImperativeHandle(ref, () => ({
        reset: () => setSelected(null),
    }));

    return (
        <>
            <Controller
                name="schedule_date"
                control={control}
                rules={{
                    required: '날짜를 선택해주세요',
                }}
                render={({ field: { onChange } }) => (
                    <DayPicker
                        mode="single"
                        onSelect={date => setDate(date, onChange)}
                        selected={selected} //
                        footer={footer}
                    />
                )}
            />
            <HookformRadio
                options={SCHEDULE_CATEGORY}
                control={control}
                errors={errors}
                keyName={'category'}
            />
        </>
    );
});

export default DdayHandler;
