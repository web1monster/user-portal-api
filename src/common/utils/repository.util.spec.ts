import { getFromDto } from './repository.util';

describe('RepositoryUtil', () => {
  const payload = {
    id: 1,
    flag: true,
    text: 'something',
    complex: { me: true },
  };
  const object = { extra: true };

  it('should copy all fields from the dto to data', () => {
    const data: any = getFromDto(payload, object);

    expect(data.id).toEqual(1);
    expect(data.flag).toEqual(true);
    expect(data.text).toEqual('something');
    expect(data.complex).toEqual({ me: true });

    // existing property should be exists from the data
    expect(data.extra).toEqual(true);
  });

  it('should copy selected fields from the dto to data', () => {
    const data: any = getFromDto(payload, object, ['text', 'flag']);

    expect(data.flag).toEqual(true);
    expect(data.text).toEqual('something');

    // existing property should be exists from the data
    expect(data.extra).toEqual(true);
  });
});
