import { test, expect } from '@playwright/test';

test.describe('UIDB Explorer Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application and display the header', async ({ page }) => {
    // Check if the header is visible
    await expect(page.locator('header')).toBeVisible();
    
    // Check if the logo is present
    await expect(page.getByAltText('Ubiquiti Logo')).toBeVisible();
    
    // Check if the devices title is present in the header
    await expect(page.getByRole('heading', { name: 'Devices' })).toBeVisible();
  });

  test('should have a functional search input', async ({ page }) => {
    // Find the search input
    const searchInput = page.getByPlaceholder(/search/i);
    
    // Check if search input is visible
    await expect(searchInput).toBeVisible();
    
    // Type in the search input
    await searchInput.fill('router');
    
    // Verify the input value
    await expect(searchInput).toHaveValue('router');
  });

  test('should display filter and view mode controls', async ({ page }) => {
    // Check if filter button is visible
    await expect(page.getByText('Filter')).toBeVisible();
    
    // Check if view mode switcher buttons are visible
    await expect(page.getByLabel('List view')).toBeVisible();
    await expect(page.getByLabel('Grid view')).toBeVisible();
  });

  test('should toggle between list and grid view', async ({ page }) => {
    // Get view mode buttons
    const listViewButton = page.getByLabel('List view');
    const gridViewButton = page.getByLabel('Grid view');
    
    // Click grid view
    await gridViewButton.click();
    
    // Verify grid view is active (has different styling)
    await expect(gridViewButton).toHaveClass(/bg-icon-hover-bg/);
    
    // Click list view
    await listViewButton.click();
    
    // Verify list view is active
    await expect(listViewButton).toHaveClass(/bg-icon-hover-bg/);
  });

  test('should open filter dropdown when filter button is clicked', async ({ page }) => {
    // Click the filter button
    await page.getByText('Filter').click();
    
    // Check if dropdown content is visible
    // The dropdown doesn't have a specific role, so check for content
    await expect(page.getByText('Reset')).toBeVisible();
    
    // Check if at least one product line checkbox is visible
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();
  });

  test('should perform a search and display results', async ({ page }) => {
    // Type in the search input
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('switch');
    
    // Wait for results to load (debounced)
    await page.waitForTimeout(600);
    
    // Check if at least one device is displayed in the table
    // The device table uses role="table" and contains buttons with device names
    const deviceTable = page.locator('[role="table"]');
    await expect(deviceTable).toBeVisible();
    
    // Check that there are device rows
    const deviceRows = page.locator('[role="row"]').filter({ hasText: /switch/i });
    await expect(deviceRows.first()).toBeVisible();
  });
});