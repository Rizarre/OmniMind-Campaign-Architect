import { test, expect } from '@playwright/test';

test.describe('OmniMind Campaign Architect E2E Flow', () => {
    test('should load the home page and display the title', async ({ page }) => {
        await page.goto('/');

        // Check main title (using text instead of just tag to be more specific)
        const title = page.getByRole('heading', { name: /OmniMind Campaign Architect/i });
        await expect(title).toBeVisible();
    });

    test('should have a functional sidebar navigation', async ({ page }) => {
        await page.goto('/');

        // Check for Sidebar navigation items
        const sidebar = page.locator('nav');
        await expect(sidebar).toBeVisible();

        // Navigate to Campaign Brain
        await page.getByRole('link', { name: /Campaign Brain/i }).click();
        await expect(page).toHaveURL('/campaign-brief');

        // Navigate to Creative Testing
        await page.getByRole('link', { name: /Creative Testing/i }).click();
        await expect(page).toHaveURL('/creative-testing');
    });

    test('should allow entering a campaign brief', async ({ page }) => {
        await page.goto('/');

        const textarea = page.locator('textarea').first();
        await expect(textarea).toBeVisible();

        const briefText = 'Launch a new sustainable coffee brand targeting Gen Z in Berlin with 50000 budget for 30 days';

        await textarea.click();
        await textarea.fill(briefText);

        // Ensure the text reached the component state
        await expect(textarea).toHaveValue(briefText);

        const generateBtn = page.getByRole('button', { name: /Generate Media Plan/i });
        await expect(generateBtn).toBeEnabled();
    });

    test('should execute campaign generation flow', async ({ page }) => {
        // Increase timeout for AI generation simulation
        test.setTimeout(60000);

        await page.goto('/');

        const textarea = page.locator('textarea').first();
        await textarea.fill('New campaign for energy drinks targeting gamers with 25000 budget');

        const generateBtn = page.getByRole('button', { name: /Generate Media Plan/i });
        await generateBtn.click();

        // Check for loading state
        await expect(page.getByText(/Initializing Engines/i)).toBeVisible();

        // Wait for results to appear (checks for common blueprint output elements)
        await expect(page.getByText(/Phased Strategy: Multi-Funnel Alignment/i)).toBeVisible({ timeout: 45000 });
        await expect(page.getByText(/High-Potential Audience Segments/i)).toBeVisible();
    });

    test('should display campaign projections on the home page', async ({ page }) => {
        await page.goto('/');

        // Check for calculation impact section
        await expect(page.getByText(/Calculated Impact/i)).toBeVisible();

        // Check for default projection stats
        await expect(page.getByText(/Potential Reach/i)).toBeVisible();
        await expect(page.getByText(/Visual Impressions/i)).toBeVisible();
        await expect(page.getByText(/Traffic Clicks/i)).toBeVisible();
    });
});
