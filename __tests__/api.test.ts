import { OpenWeatherMapGeoResponse, OpenWeatherMapResponse, fetchCities, fetchForecast } from '../api/api';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('OpenWeatherMap API', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('fetchCities returns correct data', async () => {
    const mockData: [OpenWeatherMapGeoResponse] = [{
      name: 'Warsaw',
      local_names: {
        ascii: 'Warsaw',
        feature_name: 'Warsaw'
      },
      lat: 52.2297,
      lon: 21.0122,
      country: 'Poland'
    }];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data: [OpenWeatherMapGeoResponse] = await fetchCities('Warsaw');
    expect(data).toBeDefined();
    expect(data[0].name).toBe('Warsaw');
  });

  test('fetchForecast returns correct data', async () => {
    const mockData: OpenWeatherMapResponse = {
      coord: { lon: 21.0122, lat: 52.2297 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: {
        temp: 19.44,
        feels_like: 19.01,
        pressure: 1016,
        humidity: 55,
        temp_min: 17.69,
        temp_max: 20.93,
        sea_level: 1016,
        grnd_level: 1001
      },
      visibility: 10000,
      wind: { speed: 3.13, deg: 240, gust: 3.58 },
      clouds: { all: 0 },
      dt: 1631798840,
      sys: { type: 2, id: 2035260, message: 0.1651, country: 'PL', sunrise: 1631764451, sunset: 1631810060 },
      timezone: 7200,
      id: 756135,
      name: 'Warsaw',
      cod: 200
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data: OpenWeatherMapResponse = await fetchForecast(52.2297, 21.0122);
    expect(data).toBeDefined();
    expect(data.coord.lat).toBe(52.2297);
    expect(data.coord.lon).toBe(21.0122);
  });
});
