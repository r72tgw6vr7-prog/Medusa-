/**
 * Integration Testing Suite
 * Tests all backend integrations before going live
 */

interface TestResult {
  service: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: unknown;
}

interface TestSuite {
  name: string;
  results: TestResult[];
  passed: number;
  failed: number;
  warnings: number;
}

/**
 * Test Environment Configuration
 */
export async function testEnvironmentConfig(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const suite: TestSuite = {
    name: 'Environment Configuration',
    results,
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  // Test basic configuration
  const basicVars = [
    'VITE_SITE_URL',
    'VITE_BUSINESS_NAME',
    'VITE_BUSINESS_EMAIL',
    'VITE_BUSINESS_PHONE',
  ];

  for (const varName of basicVars) {
    const value = import.meta.env[varName];
    if (value && value !== 'your_key_here') {
      results.push({
        service: varName,
        status: 'success',
        message: 'Configured correctly',
      });
      suite.passed++;
    } else {
      results.push({
        service: varName,
        status: 'error',
        message: 'Missing or placeholder value',
      });
      suite.failed++;
    }
  }

  // Test email service configuration
  const selectedProvider = import.meta.env.VITE_EMAIL_PROVIDER;
  if (!selectedProvider || selectedProvider === 'your_key_here') {
    results.push({
      service: 'Email Service',
      status: 'error',
      message: 'No email provider configured (VITE_EMAIL_PROVIDER missing)',
    });
    suite.failed++;
  } else {
    results.push({
      service: 'Email Service',
      status: 'success',
      message: `${selectedProvider} selected`,
    });
    suite.passed++;
  }

  return suite;
}

/**
 * Test Email Service Integration
 */
export async function testEmailService(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const suite: TestSuite = {
    name: 'Email Service Integration',
    results,
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  try {
    // Test email service detection
    const { sendEmail } = await import('../services/emailService');

    // Test booking confirmation email
    const testResult = await sendEmail({
      to: 'test@example.com',
      from: import.meta.env.VITE_FROM_EMAIL || 'test@medusa-tattoo-muenchen.de',
      subject: 'Test Email',
      template: 'booking-confirmation',
      data: {
        customerName: 'Test Customer',
        bookingId: 'TEST-001',
        artistName: 'Test Artist',
        serviceName: 'Test Service',
        preferredDate: '2025-01-15',
        preferredTime: '14:00',
      },
      language: 'DE',
    });

    if (testResult.success) {
      results.push({
        service: 'Email Sending',
        status: 'success',
        message: 'Email sent successfully',
        details: { messageId: testResult.messageId },
      });
      suite.passed++;
    } else {
      results.push({
        service: 'Email Sending',
        status: 'error',
        message: testResult.error || 'Failed to send email',
      });
      suite.failed++;
    }
  } catch (error) {
    results.push({
      service: 'Email Service',
      status: 'error',
      message: `Integration error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
    suite.failed++;
  }

  return suite;
}

/**
 * Test Payment Service Integration
 * Payment processing is not currently active — skipped.
 */
export async function testPaymentService(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const suite: TestSuite = {
    name: 'Payment Service Integration',
    results,
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  results.push({
    service: 'Payment Service',
    status: 'warning',
    message: 'Payment processing not active — skipped',
  });
  suite.warnings++;

  return suite;
}

/**
 * Test ZOHO CRM Integration
 */
export async function testZohoCRM(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const suite: TestSuite = {
    name: 'ZOHO CRM Integration',
    results,
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  try {
    const { initializeZohoCRM } = await import('../services/zohoCRMService');
    const zohoCRM = initializeZohoCRM();

    if (!zohoCRM) {
      results.push({
        service: 'ZOHO Configuration',
        status: 'warning',
        message: 'ZOHO CRM not configured - booking data will not sync',
      });
      suite.warnings++;
      return suite;
    }

    // Test connection
    const connectionTest = await zohoCRM.testConnection();

    if (connectionTest.success) {
      results.push({
        service: 'ZOHO Connection',
        status: 'success',
        message: 'Connected successfully',
        details: connectionTest.data,
      });
      suite.passed++;
    } else {
      results.push({
        service: 'ZOHO Connection',
        status: 'error',
        message: connectionTest.error || 'Connection failed',
      });
      suite.failed++;
    }

    // Test contact creation (dry run)
    const _testContact = {
      firstName: 'Test',
      lastName: 'Contact',
      email: 'test@example.com',
      phone: '+49 89 12345678',
      leadSource: 'Website' as const,
      tags: ['Test'],
    };

    // Note: This would actually create a contact in CRM
    // In production, use sandbox mode or skip this test
    results.push({
      service: 'ZOHO Contact Creation',
      status: 'warning',
      message: 'Skipped in test mode (would create real contact)',
    });
    suite.warnings++;
  } catch (error) {
    results.push({
      service: 'ZOHO CRM',
      status: 'error',
      message: `Integration error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
    suite.failed++;
  }

  return suite;
}

/**
 * Test API Endpoints
 */
export async function testAPIEndpoints(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const suite: TestSuite = {
    name: 'API Endpoints',
    results,
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  const endpoints = [
    { name: 'Health Check', path: '/api/health', method: 'GET' },
    { name: 'Payment Methods', path: '/api/payment-methods', method: 'GET' },
    // Note: Booking and Contact endpoints require POST data, so we test OPTIONS
    { name: 'Booking CORS', path: '/api/booking', method: 'OPTIONS' },
    { name: 'Contact CORS', path: '/api/contact', method: 'OPTIONS' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.path, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        results.push({
          service: endpoint.name,
          status: 'success',
          message: `${endpoint.method} ${endpoint.path} - ${response.status}`,
        });
        suite.passed++;
      } else {
        results.push({
          service: endpoint.name,
          status: 'warning',
          message: `${endpoint.method} ${endpoint.path} - ${response.status}`,
        });
        suite.warnings++;
      }
    } catch (error) {
      results.push({
        service: endpoint.name,
        status: 'error',
        message: `${endpoint.method} ${endpoint.path} - ${error instanceof Error ? error.message : 'Network error'}`,
      });
      suite.failed++;
    }
  }

  return suite;
}

/**
 * Run all integration tests
 */
export async function runAllTests(): Promise<{
  suites: TestSuite[];
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    warnings: number;
    readiness: 'ready' | 'needs_setup' | 'critical_issues';
  };
}> {
  if (!import.meta.env.PROD) {
    console.warn('🧪 Running integration tests...');
  }

  const suites = await Promise.all([
    testEnvironmentConfig(),
    testEmailService(),
    testPaymentService(),
    testZohoCRM(),
    testAPIEndpoints(),
  ]);

  const summary = {
    totalTests: suites.reduce((sum, suite) => sum + suite.results.length, 0),
    passed: suites.reduce((sum, suite) => sum + suite.passed, 0),
    failed: suites.reduce((sum, suite) => sum + suite.failed, 0),
    warnings: suites.reduce((sum, suite) => sum + suite.warnings, 0),
    readiness: 'ready' as 'ready' | 'needs_setup' | 'critical_issues',
  };

  // Determine readiness level
  if (summary.failed > 5) {
    summary.readiness = 'critical_issues';
  } else if (summary.failed > 0 || summary.warnings > 10) {
    summary.readiness = 'needs_setup';
  } else {
    summary.readiness = 'ready';
  }

  if (!import.meta.env.PROD) {
    console.warn(`✅ ${summary.passed} passed`);
    console.warn(`⚠️ ${summary.warnings} warnings`);
    console.warn(`❌ ${summary.failed} failed`);
    console.warn(`🎯 Readiness: ${summary.readiness}`);
  }

  return { suites, summary };
}

/**
 * Test form submission end-to-end
 */
export async function testFormSubmission(testData: {
  type: 'booking' | 'contact';
  data: unknown;
}): Promise<TestResult> {
  try {
    const endpoint = testData.type === 'booking' ? '/api/booking' : '/api/contact';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData.data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        service: `${testData.type} submission`,
        status: 'success',
        message: 'Form submitted successfully',
        details: result,
      };
    } else {
      return {
        service: `${testData.type} submission`,
        status: 'error',
        message: result.message || 'Submission failed',
        details: result,
      };
    }
  } catch (error) {
    return {
      service: `${testData.type} submission`,
      status: 'error',
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}
