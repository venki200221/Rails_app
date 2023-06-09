# frozen_string_literal: true

require 'rails_helper'

describe RevisionFeedbackController, type: :request do
  describe '#index' do
    let!(:course) { create(:course, id: 1) }
    let(:assignment) { create(:assignment, id: 1, course_id: course.id) }
    let(:params) { { title: 'Quantum_Chemistry', assignment_id: assignment.id } }

    context 'When the article exists' do
      before do
        VCR.use_cassette 'ores_features' do
          get '/revision_feedback', params:
        end
      end

      it 'renders without error' do
        expect(response.status).to eq(200)
      end

      it 'calls RevisionFeedbackService with features' do
        VCR.use_cassette 'ores_features' do
          # Checks if a valid feedback is received from RevisionFeedbackService
          expect_any_instance_of(RevisionFeedbackService).to receive(:feedback)
            .and_call_original
          get '/revision_feedback', params: params
          expect(response.body).to include('Cite your sources!')
        end
      end

      it 'assigns valid feedback' do
        feedback = assigns(:feedback)
        expect(feedback.length).to be >= 1
      end
    end
  end
end
