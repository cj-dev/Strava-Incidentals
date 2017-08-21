require 'strava/api/v3'

class Strava::SegmentsController < ApplicationController
    def explore
        render json: request_segments(params[:bounds])
    end

    private
    def request_segments(coordinates)
        @client = Strava::Api::V3::Client.new(
            :access_token => Rails.application.secrets.strava_access)
        results = @client.segment_explorer(args = {bounds: coordinates})
        return results
    end
end
