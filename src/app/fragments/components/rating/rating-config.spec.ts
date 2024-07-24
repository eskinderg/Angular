import { RatingConfig } from './rating-config';

describe('ngb-rating-config', () => {
    it('should have sensible default values', () => {
        const config = new RatingConfig();

        expect(config.max).toBe(10);
        expect(config.readonly).toBe(false);
        expect(config.resettable).toBe(false);
        expect(config.tabindex).toBe(0);
    });
});
