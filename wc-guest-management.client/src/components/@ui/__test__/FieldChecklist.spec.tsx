import { render } from '@testing-library/react';
import FieldChecklist from 'components/@ui/FieldChecklist';
import React from 'react';

type Props = React.ComponentProps<typeof FieldChecklist>;

describe('FieldChecklist', () => {
    it('should render checklist correctly', () => {
        const props: Props = {
            name: 'field-check-list',
            checklist: ['check-one', 'check-two'],
        };

        const { container, queryByText } = render(<FieldChecklist {...props} />);
        const checkOne = container.querySelector(`#${props.name}1`);
        const checkTwo = container.querySelector(`#${props.name}2`);
        const checkOneLabel = queryByText(props.checklist[0]);
        const checkTwoLabel = queryByText(props.checklist[1]);

        expect(checkOne).toHaveAttribute('name', props.name);
        expect(checkOne).not.toBeNull();
        checkOne && expect(checkOne.id).toBe(`${props.name}1`);
        expect(checkOneLabel).toBeInTheDocument();

        expect(checkTwo).toHaveAttribute('name', props.name);
        expect(checkTwo).not.toBeNull();
        checkTwo && expect(checkTwo.id).toBe(`${props.name}2`);
        expect(checkTwoLabel).toBeInTheDocument();
    });
});
