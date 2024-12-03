import { client } from '@/lib/prisma';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Parse request body
    const body = await req.json();
    const { id } = params;

    const transcription = body.transcript;

    // Check if process.env.GEMINI_API_KEY is defined
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined");
    }

    // Call Gemini AI to generate title and summary based on transcription
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const completion = await model.generateContent(
      `Generate a title and description based on this transcription: ${transcription}`
    );
    
    if (!completion.response || !completion.response.text) {
      console.log('🔴 Failed to get response from Gemini AI');
      return NextResponse.json({ status: 400 });
    }

    // Parse the result correctly to get title and summary
    const generatedContent = JSON.parse(completion.response.text());
    const { title, summary } = generatedContent;

    // Update video details in the database
    const transcribed = await client.video.update({
      where: {
        userId: id,
        source: body.filename,
      },
      data: {
        title,
        description: summary,
        summery: transcription,
      },
    });

    if (transcribed) {
      console.log('🟢 Transcribed and updated');

      // Update Voiceflow Knowledge Base
      const options = {
        method: 'POST',
        url: process.env.VOICEFLOW_KNOWLEDGE_BASE_API!,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: process.env.VOICEFLOW_API_KEY!,
        },
        data: {
          schema: {
            searchableFields: ['title', 'transcript'],
            metadataFields: ['title', 'transcript'],
          },
          name: title,
          items: [
            {
              title,
              transcript: transcription,
            },
          ],
        },
      };

      const updateKB = await axios.request(options);

      if (updateKB.status === 200) {
        console.log('🟢 Knowledge Base updated successfully');
        return NextResponse.json({ status: 200 });
      } else {
        console.log('🔴 Failed to update Knowledge Base');
      }
    }
  } catch (error) {
    console.error('🔴 Error in processing transcription:', error);
  }

  console.log('🔴 Transcription or update process failed');
  return NextResponse.json({ status: 400 });
}