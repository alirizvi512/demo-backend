import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from './notification.dto';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('local'))
@Controller('notification')
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {

    }
    @Get()
    public async findAll() {
        const notifications = await this.notificationService.findAll();
        return {
            status: HttpStatus.OK,
            data: notifications,
            message: 'Success'
        };
    }

    @Post()
    public async create(@Body() createNotificationDto: CreateNotificationDto) {
        const notification = await this.notificationService.create(createNotificationDto);
        return {
            status: HttpStatus.OK,
            data: notification,
            message: 'Success'
        };
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() updateNotificationDto: UpdateNotificationDto) {
        const message = this.notificationService.update(id, updateNotificationDto);
        return {
            status: HttpStatus.OK,
            message: message
        };
    }

    @Get(':id')
    public async findOne(@Param('id') id: number) {
        const notification = await this.notificationService.findOne(id);
        return {
            status: HttpStatus.OK,
            data: notification,
            message: 'Success'
        };
    }

    @Delete(':id')
    public async remove(@Param('id') id: number) {
        const message = await this.notificationService.delete(id);
        return {
            status: HttpStatus.OK,
            message: message
        };
    }
}