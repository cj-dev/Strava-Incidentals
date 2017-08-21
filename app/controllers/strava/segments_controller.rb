require 'strava/api/v3'

class Strava::SegmentsController < ApplicationController
    def explore
        render json: request_segments(params[:bounds])
    end

    def batch_explore
        bounds_batch = params[:boundsArray]
        results = {segments: []}
        bounds_batch.each do |bounds|
            results[:segments].push(*request_segments(bounds)['segments'])
        end
        render json: results
    end

    private
    def request_segments(bounds)
        @client = Strava::Api::V3::Client.new(
            :access_token => Rails.application.secrets.strava_access)
        results = @client.segment_explorer(args = {bounds: bounds})
        return results
    end
end
