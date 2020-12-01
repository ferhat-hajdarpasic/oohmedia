import { render, findByText, fireEvent, waitFor } from '@testing-library/react';
import {waitForDomChange} from '@testing-library/dom'

import App from './App';

test('search by user id = 3 returns 2 results as required', async () => {
    render(<App />);

    const rolesTable = document.getElementById('rolesTable');
    expect(await findByText(document, 'System Administrator')).toBeVisible();

    const textFieldUserId = document.getElementById('textFieldUserId');
    expect(textFieldUserId).toBeInTheDocument();

    fireEvent.change(textFieldUserId, { target: { value: '3' } })
    expect(textFieldUserId.value).toBe('3');

    const buttonShowHierarchy = document.getElementById('buttonShowHierarchy');
    fireEvent.click(buttonShowHierarchy);

    const hierarchyTable = document.getElementById('hierarchyTable');

    expect(await findByText(hierarchyTable, 'Emily Employee')).toBeVisible();
    expect(await findByText(hierarchyTable, 'Trent Trainer')).toBeVisible();
});
