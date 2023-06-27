export const weatherRequests = {
  getAll: async () => {
    const request = await fetch(
      'https://api-deslocamento.herokuapp.com/api/v1/WeatherForecast'
    );
    return request.json();
  }
};
