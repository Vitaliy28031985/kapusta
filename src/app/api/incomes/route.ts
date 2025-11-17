
import { getIncomesData } from '@/app/get-data/getIncomes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
 const id = req.nextUrl.searchParams.get('id');
  if (typeof id === 'string') {
      const data = await getIncomesData(id);
  
  try {
    return NextResponse.json({ success: true, data });
  } catch  {
    return NextResponse.json({ success: false, error:  'Internal Error' }, { status: 500 });
  }   
    }
   
}