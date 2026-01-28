import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/service/common.types';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBranchDto } from './dto/create-branch.dto';
import { AuthRequest } from 'src/users/user.types';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

   @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create Branch' })
  @ApiBody({ type: CreateBranchDto })
  async create(
    @Req() req: AuthRequest,
    @Body() createBranchDto: CreateBranchDto,
  ): Promise<SuccessResponseDto> {
    const userId = Number(req.user.userId)
    return this.branchService.createBranch(createBranchDto, userId);
  }
}
