import { InfoSlip } from 'Api';
import faker from 'faker';
import { formatDate, getCurrentDateFormatted, getCurrentTimeSlot } from './dates';

type ValidationType = 'required' | 'max' | 'min';
type ValidationRules = {
    validationType: ValidationType;
    invalidValue: string;
};
export type TargetInput = {
    label: string;
    value: string;
    initialState: string;
    validationRules?: ValidationRules[];
};
export type TargetInvalidInput = {
    label: string;
    invalidValue: string;
    description: string;
};
function getTestDescription(label: string) {
    return {
        required: () => `should a be a required field [${label}]`,
        max: () => `should have a max value [${label}]`,
        min: () => `should have a min value [${label}[]`,
    };
}

class TestFormBuilder {
    private targetInputs: TargetInput[] = [];
    private invalidInputs: TargetInvalidInput[] = [];

    constructor() {}

    public append(
        label: string,
        value: string,
        initialState: string,
        validationRules?: ValidationRules[]
    ) {
        const target = {
            label,
            value,
            initialState,
            validationRules,
        };
        this.targetInputs.push(target);
        this.appendInvalidInput(target);
    }

    private appendInvalidInput(target: TargetInput) {
        target.validationRules?.forEach((rule) => {
            const descriptionFn = getTestDescription(target.label)[rule.validationType];
            const invalidInput: TargetInvalidInput = {
                label: target.label,
                invalidValue: rule.invalidValue,
                description: descriptionFn && descriptionFn(),
            };
            this.invalidInputs.push(invalidInput);
        });
    }

    public build() {
        return {
            targetInputs: this.targetInputs,
            invalidInputs: this.invalidInputs,
        };
    }
}

export function buildGuestInfoSlipTargets(infoSlip: InfoSlip) {
    const formBuilder = new TestFormBuilder();
    formBuilder.append('visit date', infoSlip.visitDate, getCurrentDateFormatted(), [
        { invalidValue: '', validationType: 'required' },
        { invalidValue: formatDate(faker.date.future()), validationType: 'max' },
    ]);
    formBuilder.append('time slot', infoSlip.worshipTime as string, getCurrentTimeSlot());
    formBuilder.append('table number', infoSlip.tableNumber?.toString() ?? '', '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    formBuilder.append('volunteer', infoSlip.volunteer as string, '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    formBuilder.append('guests', infoSlip.guests as string, '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    return formBuilder.build();
}
