/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import * as useCountriesModule from '../../hooks/useCountries';

describe('SearchBar Component', () => {
    
    it('calls onSearch with city and country code when the search icon is clicked', async () => {
        jest.spyOn(useCountriesModule, 'default').mockImplementation(() => ({
            data: [{ code: 'US', flag: 'https://flagcdn.com/w320/us.png', name: 'United States' }],
            error: null,
            isLoading: false,
          }));
          
        const mockOnSearch = jest.fn();
        render(<SearchBar onSearch={mockOnSearch} />);
    
        const cityInput = screen.getByPlaceholderText('Enter city name...');
        const searchButton = screen.getByTestId('search-button');
    
        await userEvent.type(cityInput, 'Amsterdam');
        userEvent.click(searchButton);
    
        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledWith('Amsterdam', 'NL');
          });
    });
    it('displays loader when countries are loading', async () => {
        jest.spyOn(useCountriesModule, 'default').mockImplementation(() => ({
          data: null,
          error: null,
          isLoading: true,
        }));
      
        render(<SearchBar onSearch={jest.fn()} />);
        await screen.findByTestId('loader');
      });

      it('displays error message when there is an error fetching countries', () => {
        jest.spyOn(useCountriesModule, 'default').mockImplementation(() => ({
          data: null,
          error: { message: "Failed to fetch countries" },
          isLoading: false,
        }));
      
        render(<SearchBar onSearch={jest.fn()} />);
        expect(screen.getByText(/An error occurred: Failed to fetch countries for the countries/)).toBeInTheDocument();
      });
});
