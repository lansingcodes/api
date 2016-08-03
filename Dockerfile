FROM ruby:alpine

ARG BUNDLE_WITHOUT=test:development
ENV BUNDLE_WITHOUT ${BUNDLE_WITHOUT}

ADD Gemfile* /app/

RUN apk --update add --virtual .deps build-base \
    && apk add --virtual .run-deps tzdata musl-dev \
    && cd /app; bundle install \
    && rm -rf /var/cache/apk*

ADD . /app
RUN chown -R nobody:nogroup /app
USER nobody

ARG RACK_ENV=production
ENV RACK_ENV ${RACK_ENV}

EXPOSE 9292

WORKDIR /app
CMD ["rackup", "--host", "0.0.0.0"]
