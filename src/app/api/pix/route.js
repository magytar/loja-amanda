export async function POST(request) {
  try {
    const body = await request.json();
    
    // Log the request body for debugging
    console.log('PIX Request Body:', body);
    
    // Validate required fields
    if (!body.identifier || !body.amount || !body.client) {
      return Response.json({ 
        error: 'Campos obrigatórios: identifier, amount, client' 
      }, { status: 400 });
    }

    const response = await fetch('https://api.boltpagamentos.com.br/api/v1/gateway/pix/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-key': 'amandaoliveira2025amanda_1756696279052',
        'x-secret-key': 'd99a9f09-c420-4ae2-a457-34c4633a0d75'
      },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    console.log('PIX API Response Status:', response.status);
    console.log('PIX API Response Data:', data);
    
    if (response.ok && data.status === 'OK') {
      return Response.json(data);
    } else {
      // Handle API errors
      const errorMessage = data?.message || data?.error || data?.details || `HTTP ${response.status}: ${response.statusText}`;
      console.error('API Error Details:', data);
      return Response.json({ 
        error: errorMessage,
        details: data,
        status: response.status
      }, { status: response.status || 500 });
    }
    
  } catch (error) {
    console.error('Erro na API PIX:', error);
    return Response.json({ 
      error: 'Erro interno do servidor',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}