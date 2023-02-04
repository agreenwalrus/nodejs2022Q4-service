import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './in-memory/track.repository';
import { NotFoundError } from 'src/utils/errors';
import { ENTITY_NOT_FOUND_ERROR } from 'src/utils/constants';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  create(createTrackDto: CreateTrackDto) {
    return this.trackRepository.create(createTrackDto);
  }

  findAll() {
    return this.trackRepository.getAll();
  }

  findOne(id: string) {
    const track = this.trackRepository.get(id);
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.trackRepository.get(id);
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    return this.trackRepository.update({ ...track, ...updateTrackDto });
  }

  remove(id: string) {
    const track = this.trackRepository.get(id);
    if (!track) {
      throw new NotFoundError(ENTITY_NOT_FOUND_ERROR);
    }
    this.trackRepository.delete(id);
    return track;
  }
}
