import { axios } from '@/utils/axios'
import { createRequestService } from '@/api/request';
import { createLocalStorage } from '@/api/localStorage';
import { createAuthGateway } from '@/gateway/auth.gateway';

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      },
      request: jest.mocked(jest.fn() as jest.MockedFunction<typeof axios.request>)
    }))
  }
})

describe('AuthGateway', () => {
  beforeEach(() => {
    (axios.request as jest.MockedFunction<typeof axios.request>).mockReset();
  })

  const mockAuthService = createAuthGateway(createRequestService(), createLocalStorage())

  it('makes a GET request to fetch the token', async () => {
    const tokenResponse = 'token';

    (axios.request as jest.MockedFunction<typeof axios.request>).mockResolvedValueOnce({
      data: {
        token: tokenResponse
      }
    });

    const data = await mockAuthService.signIn();

    if (data.isSuccess) {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(data.response.token).toStrictEqual(tokenResponse);
    }
  });

  it('should return network error', async () => {
    (axios.request as jest.MockedFunction<typeof axios.request>).mockRejectedValueOnce(new Error('Network error'));

    const response= await mockAuthService.signIn();

    if (!response.isSuccess) {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(response.error.length).toBeGreaterThan(0);
    }
  });

  it('should trigger sign in if user is not logged in', async () => {
    const authGatewaySignInStub = jest
      .spyOn(mockAuthService, 'signIn')

    await mockAuthService.initToken()

    expect(authGatewaySignInStub).toHaveBeenCalled();
  })

  it('should get item from localStorage to retrieve logged in', async () => {
    const authGatewayLocalStorageStub = jest
      .spyOn(mockAuthService, 'getLocalAccessToken')

    await mockAuthService.initToken()

    expect(authGatewayLocalStorageStub).toHaveBeenCalled();
  })

  it('should trigger sign in if user is not logged in', async () => {
    const authGatewaySignInStub = jest
      .spyOn(mockAuthService, 'signIn')

    await mockAuthService.initToken()

    expect(authGatewaySignInStub).toHaveBeenCalled();
  })
});