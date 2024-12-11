import { render, waitFor } from '@testing-library/react';
import App from 'components/App';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { mockData } from '../mockData';
import { wrapper } from '../utils';
import { queryAllIssues } from 'utils/fetch';

const server = setupServer(
    http.get('/api/data', () => {
        return HttpResponse.json(mockData)
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<App />', () => {
    it('should render the Data', async () => {
        const { getByText, container } = render(<App />, { wrapper })

        expect(getByText('loading data...')).toBeInTheDocument()
        await waitFor(() => expect(container).toHaveTextContent('results'))
    })
})

