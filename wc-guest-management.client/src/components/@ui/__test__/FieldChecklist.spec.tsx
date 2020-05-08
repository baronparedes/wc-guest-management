import { render } from '@testing-library/react';
import FieldChecklist from 'components/@ui/FieldChecklist';
import faker from 'faker';
import React from 'react';

type Props = React.ComponentProps<typeof FieldChecklist>;

describe('FieldChecklist', () => {
    it('should render checklist correctly', () => {
        const props: Props = {
            name: faker.random.word(),
            checklist: [faker.random.word(), faker.random.word()],
        };

        const { container, queryByText, getByLabelText } = render(
            <FieldChecklist {...props} />
        );

        props.checklist.forEach((item) => {
            const check = getByLabelText(item);
            const checkOneLabel = queryByText(item);
            expect(check).toHaveAttribute('name', props.name);
            expect(check).not.toBeNull();
            check && expect(check.id).toBe(item);
            expect(checkOneLabel).toBeInTheDocument();
        });
    });
});
